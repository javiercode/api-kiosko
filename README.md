# api-apuesta

backend de servicios centralizados para el control y gestión de apuestas.

## Configuracion de debug vscode

La clase principal se compila en base al archivo principal y se puede ejecutar con el siguiente ejemplo:

```launch.json
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\src\\index.ts",
            "args": ["--env","local"],
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}

```


Ejemplo de variables env:
```
NODE_ENV=developtment

##########################    SERVICE   ##########################
PORT=4000
URL_PATH=/apuesta/api/v1
PETICIONES_TIEMPO=100

##########################    MONGODB   ##########################
MONGO_DATABASE=apuesta
#MONGO_URL=mongodb+srv://admin:ew1C967LQNaWc7iN@cluster0.xhicr.mongodb.net/webhook
MONGO_URL=mongodb://localhost:27017


##########################    JWT   ##########################
JWT_TOKEN_SECRET=f361aaa1177c444a9da7e59f0aca299e1cc33ebdfa245299222b1fa104e515085e427dc974aa8cc294c87f4b4f68ca6902dce5df5e48532f3997f3b6eb163f16
PASS_SALT=secret
#% EXPIRE=60*60*12
JWT_TOKEN_EXPIRE=43200

```