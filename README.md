# API Save Text

API simple para recibir un texto y almacenarlo en un archivo `.txt`.

## Endpoint

- **POST** `/guardar`
- Parámetros en el `body` (JSON):
  ```json
  {
    "texto": "Tu texto aquí"
  }
  ```

## Uso

Envía un `POST` a `/guardar` para guardar texto.

Compatible con **Vercel** para despliegue inmediato.
