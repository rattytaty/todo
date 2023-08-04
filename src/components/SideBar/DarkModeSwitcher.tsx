import React, {ChangeEvent, useEffect, useState} from 'react';
import sun from "../../assets/sun.svg"
import moon from "../../assets/moon.svg"

export const DarkModeSwitcher = () => {
    useEffect(()=>{
        const myTheme  = localStorage.getItem("theme")
        if (myTheme) {
            setTheme(myTheme)
        }
    },[])
    const [theme, setTheme] = useState<string>(
        "myLightTheme"
    )

    const handleToggle = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setTheme("myDarkTheme");
        } else {
            setTheme("myLightTheme");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html")!.setAttribute("data-theme", localTheme!);
    }, [theme]);


    return <label className="swap ">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === "myLightTheme" ? false : true}
                        />
                        <img src={sun} alt="light" className="w-8 h-8 swap-on" />
                        <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
                    </label>


};