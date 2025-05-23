"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface FooterClientProps {
  footerTitle: string;
}

export default function FooterClient({ footerTitle }: FooterClientProps) {
  return (
    <Box component="footer" className="footer">
      <Typography
        sx={{
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
        }}
        variant="subtitle1"
        align="center"
        color="secondary"
        component="div">
        © {new Date().getFullYear()} {footerTitle}. All rights reserved.
        <Typography
          sx={{
            fontSize: "0.8rem",
            marginTop: "0.5rem",
            color: "#888",
          }}
          variant="body2"
          align="center"
          component="div">
          Developed &amp; maintained by{" "}
          <Link
            href="https://github.com/MarRadman"
            target="_blank"
            rel="noopener noreferrer">
            MarRadman
          </Link>
        </Typography>
      </Typography>
    </Box>
  );
}
