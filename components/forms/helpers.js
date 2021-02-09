export function checkRequired(bool) {
    if (!bool) {
        return "";
    }

    return <span className="text-ff-red ml-1">*</span>;
}