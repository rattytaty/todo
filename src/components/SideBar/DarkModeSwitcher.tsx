import React, {ChangeEvent, useEffect, useState} from 'react';
import sun from "../../assets/sun.svg"
import moon from "../../assets/moon.svg"

export const DarkModeSwitcher: React.FC = React.memo(() => {
    const [theme, setTheme] = useState<string>("myLightTheme")
    useEffect(() => {
        const myTheme = localStorage.getItem("theme")
        if (myTheme) {
            setTheme(myTheme)
        }
    }, [])
    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setTheme("myDarkTheme");
        } else {
            setTheme("myLightTheme");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html")!.setAttribute("data-theme", theme);
    }, [theme]);

    return <div>
        <label className="swap ">
            <input
                type="checkbox"
                onChange={handleToggle}
                checked={theme !== "myLightTheme"}
            />
            <img src={sun} alt="light" className="w-8 h-8 swap-on"/>
            <img src={moon} alt="dark" className="w-8 h-8 swap-off"/>
        </label>
    </div>
})