"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";

/**
 * Displays the current local time in Cairo, Egypt (UTC+2).
 * Updates every minute to keep the time accurate.
 * @returns {ReactNode} A paragraph element displaying the local time.
 */
function LocalTime(): ReactNode {
    const [time, setTime] = useState<string>("Cairo local time");

    // ? Updates the time state with the current time in Cairo, Egypt (UTC+2).
    useEffect(() => {
        const updateClock = (): void => {
            try {
                const egyptTime: string = new Intl.DateTimeFormat("en-GB", {
                    timeZone: "Africa/Cairo",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Formats time in AM/PM format
                }).format(new Date());

                setTime(egyptTime);
            } catch (error) {
                console.error("Error fetching local time:", error);
                setTime("Unavailable");
            }
        };

        updateClock();
        const intervalId: NodeJS.Timeout = setInterval(updateClock, 60_000);

        return () => clearInterval(intervalId);
    }, []);

    return useMemo(() => <p className="local-time">{time} UTC+2</p>, [time]);
}

export default LocalTime;
