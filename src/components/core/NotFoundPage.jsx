import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div id="error-page" style={{ margin: "80px", textAlign: "center" }}>
      <h1>упс... страница не найдена</h1>
      <p>
        Можете перейти на
        <Link
          component={RouterLink}
          to="/main"
          underline="none"
          sx={{ paddingLeft: "4px" }}
        >
          главную
        </Link>{" "}
        или
        <Link
          href="https://t.me/RollMove"
          underline="none"
          target="_blank"
          rel="noopener"
          sx={{ paddingLeft: "4px" }}
        >
          посетить канал клуба в Telegram
        </Link>
        .
      </p>
    </div>
  );
}
