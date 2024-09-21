import { toast } from "sonner"

export default function setToast(type, message) {
    toast[type](message, { action: { label: "Close", onClick: () => console.log("Close") }, })
}