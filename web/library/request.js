"use client";

import { useState } from "react";
import setToast from "./toast";

export function useFetch(cashe = "no-cache") {
    const BASE_URL = process.env.api;

    let [data, setData] = useState({});
    let [isLoad, setIsLoad] = useState(false);
    let [isError, setIsError] = useState(false);
    let [valError, setValError] = useState({});

    /* get request */
    let request = async (method, url, input, success = false) => {
        /* start oading ... */
        setIsLoad(true);

        try {
            let options = {
                method: method,
                mode: "cors",
                cache: cashe,
                redirect: "follow",
                referrerPolicy: "no-referrer",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "max-age=46400, public",
                },
            };

            /* set body if method POST */
            if (method == "POST") {
                options = { ...options, body: JSON.stringify(input) };
            }

            const response = await fetch(`${BASE_URL}/api/${url}`, options);

            /* stop loading ... */
            setIsLoad(false);

            let data = await response.json();
            if (!response.ok) {
                let message = data?.message;
                if (response.status == 403) {
                    message = data.err;
                    setValError(data.err);
                }

                if (response.status == 405) {
                    for (let item in data?.err) {
                        setToast("error", data?.err[item]);
                    }
                }

                /* set error ... */
                setIsError(true);
                setToast("error", message);
                return { status: 0, data: null };
            }

            if (success) setToast("success", data?.message);
            setData(data);

            return { status: response?.status, data };
        } catch (err) {
            setIsLoad(false);
            setIsError(true);
            setToast("error", `ServerError: ${err.message}`);
            return { status: 0, data: null };
        }
    };

    return { isLoad, isError, valError, data, request };
}
