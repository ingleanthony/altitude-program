import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { colors } = useTheme();
  return (
    <footer>
      Altitude 2022
      <style>
        {`footer {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 10em;
            font-size: 10pt;
            color: ${colors.caption}
          }`}
      </style>
    </footer>
  );
}
