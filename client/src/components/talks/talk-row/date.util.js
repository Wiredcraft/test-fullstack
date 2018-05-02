export const getDateDiff = (date) => {
    let hours, minutes;
    let milliseconds = new Date() - new Date(date);

    hours = Math.floor(milliseconds / 1000 / 60 / 60);
    milliseconds -= hours * 1000 * 60 * 60;
    minutes = Math.floor(milliseconds / 1000 / 60);

    return { hours, minutes };
};
