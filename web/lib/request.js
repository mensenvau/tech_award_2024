"use client";

import { useState } from "react";
import setToast from "./toast";

export function useFetch(cashe = "no-cache") {
    const BASE_URL = process.env.api;

    let [data, setData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let [isFailed, setIsFailed] = useState(false);

    /* get request */
    let request = async (method, url, input, success = false) => {
        /* start oading ... */
        setIsLoading(true);

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
            setIsLoading(false);

            let data = await response.json();
            if (!response.ok) {
                let message = data?.message;

                /* set error ... */
                setIsFailed(true);
                setToast("error", message);
                return { status: 0, data: null };
            }

            if (success) setToast("success", data?.message);
            setData(data);

            return { status: response?.status, data };
        } catch (err) {
            setIsLoading(false);
            setIsFailed(true);
            setToast("error", `${err.message}`);
            return { status: 0, data: null };
        }
    };

    return { data, request, isLoading, isFailed };
}
