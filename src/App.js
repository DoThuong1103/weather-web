import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "./themes/theme"
import { DashboardContainer, MiddleContainer } from "./themes/styled"
import { Routes, Route } from "react-router-dom"
import { Dashboard, Map, Saves } from "./pages/allPages"
import TopNav from "./components/TopNav"
import WeatherDisplay from "./components/WeatherDisplay"
import LeftNav from "./components/LeftNav"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopNav />
        <DashboardContainer>
          <LeftNav />
          <MiddleContainer p={2}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<Map />} />
              <Route path="/saves" element={<Saves />} />
            </Routes>
          </MiddleContainer>
          <WeatherDisplay />
        </DashboardContainer>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
