
import { useTheme } from "../hooks/useTheme"

export default function Header() {
  const [isDark, setIsDark] = useTheme()

  // if(isDark) {
  //   document.body.classList.add('dark')
  // }
  // else {
  //   document.body.classList.remove('dark')
  // }

  return (
    <header className={`content ${isDark ? 'dark': ''}`}>
           <div className="header-container">
              <h2 className="title"><a href="/">Where in the world?</a></h2>
              <p className="theme-changer" onClick={() => {
               setIsDark(!isDark)
                localStorage.setItem('isDarkMode', !isDark)
              }}><i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`} />&nbsp;{isDark ? 'Light' : 'Dark'} Mode</p>
           </div>
    </header>
  )
}
