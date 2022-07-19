import React, { useState } from "react"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

const steps = [
  { label: "Add Shipping Info", icon: <LocalShippingIcon /> },
  { label: "Confirm order", icon: <LibraryAddCheckIcon /> },
  { label: "Payment", icon: <AccountBalanceIcon /> },
]

const ShippingSteps = ({ activeStep }) => {
  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={{ marginTop: "1.2rem" }}
      >
        {steps.map((item, idx) => {
          return (
            <Step
              key={idx}
              active={activeStep === idx ? true : false}
              completed={activeStep >= idx ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= idx ? "rgb(17, 156, 255)" : "inherit",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </>
  )
}

export default ShippingSteps
