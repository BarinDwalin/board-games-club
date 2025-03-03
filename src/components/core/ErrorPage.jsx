import { useRouteError } from "react-router-dom";
import { Link } from "@mui/material";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{ textAlign: "center" }}>
      <h1>упс... страница не найдена</h1>
      <p>
        Можете перейти на главную или
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
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
