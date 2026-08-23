"use client";

import { useEffect } from "react";

/**
 * Filet de sécurité ultime : ne s'affiche que si une erreur casse le
 * root layout lui-même. Doit fournir son propre <html>/<body>, sans
 * dépendre d'aucun composant applicatif (Header/Footer inclus).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          background: "#05060a",
          color: "#f3f5f9",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>RAF Shop est momentanément indisponible</h1>
        <p style={{ color: "#a6afc0", maxWidth: "28rem" }}>
          Une erreur critique est survenue. Merci de réessayer dans quelques instants.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#2b6bff",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "0.65rem 1.5rem",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
