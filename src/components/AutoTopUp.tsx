import React, { useState } from "react";
import { Typography, Slider, Button } from "@mui/material";
import CustomSwitch from "./CustomSwitch";

const creditOptions = [
  { value: 0, label: "500", price: 5 },
  { value: 1, label: "1200", price: 10 },
  { value: 2, label: "1700", price: 15 },
  { value: 3, label: "2500", price: 20 },
  { value: 4, label: "3900", price: 25 },
  { value: 5, label: "5000", price: 30 },
];

function AutoTopUp() {
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState<boolean>(true);
  const [sliderValue, setSliderValue] = useState<number>(1);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoTopUpEnabled(event.target.checked);
  };

  const handleConfirmPurchase = () => {
    const selectedCredit = creditOptions.find(
      (option) => option.value === sliderValue
    );
    if (selectedCredit) {
      console.log(
        `Selected credit amount: ${selectedCredit.label} credits for $${selectedCredit.price}`
      );
    } else {
      console.log("Please select a credit amount.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="max-w-screen-md shadow-xl rounded-lg p-10">
        <div className="flex gap-3 items-center">
          <Typography variant="h6" className="heading">
            Setup Auto Top-up
          </Typography>
          <CustomSwitch
            checked={autoTopUpEnabled}
            onChange={handleToggleChange}
          />
        </div>
        <Typography variant="body2" className="para text-zinc-400 font-medium">
          Once the credit goes below a minimum threshold{" "}
          <span className="text-purple-500 font-bold">50</span>, we will
          auto-purchase <span className="text-purple-500 font-bold">1200</span>{" "}
          credits and add them to your account.{" "}
          <a className="font-bold text-zinc-600 underline" href="#">
            Learn More
          </a>
        </Typography>
        {autoTopUpEnabled && (
          <div className="mt-5">
            <Slider
              className="slider !text-purple-500 !h-2"
              value={sliderValue}
              onChange={handleSliderChange}
              step={1}
              min={0}
              max={5}
            />

            <div className="credit flex justify-between items-center">
              {creditOptions.map((option) => (
                <div key={option.value}>
                  <span className="block font-bold">${option.price}</span>
                  <span className="block text-sm text-zinc-400 tracking-tighter leading-3 sm:leading-relaxed">
                    {option.label} credits
                  </span>
                </div>
              ))}
            </div>
            <Button
              sx={{
                backgroundColor: "#a855f7",
                marginTop: "1.25rem",
                "&:hover": { backgroundColor: "#9847ff" },
                textTransform: "none",
              }}
              variant="contained"
              onClick={handleConfirmPurchase}
            >
              Confirm auto-purchase
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoTopUp;
