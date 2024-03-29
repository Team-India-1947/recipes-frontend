# team-india

## Installation

Install the application dependencies by running:

```sh
npm install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

## DataProvider

The included data provider use [ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server). It fits REST APIs powered by [JSON Server](https://github.com/typicode/json-server), such as [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

You'll find an `.env` file at the project root that includes a `VITE_JSON_SERVER_URL` variable. Set it to the URL of your backend. By default, we set it to targets [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Net endpoint

| Method | Endpoint     | Data sent                         | Action                         | Data expected                                                     |
| ------ | ------------ | --------------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| GET    | /recipes     |                                   | Retrieve the list of recipes   | `[{ id: number, title: string, timestamp: number, body: string}]` |
| GET    | /recipes/:id |                                   | Retrieve the a specific recipe | `{ id: number, title: string, timestamp: number, body: string }`  |
| POST   | /recipes     | `{ title: string, body: string }` | Create a new recipe            | `{ id: number, title: string, timestamp: number, body: string }`  |
| PUT    | /recipes/:id | `{ title: string, body: string }` | Update a recipe                | `{ id: number, title: string, timestamp: number, body: string }`  |
| DELETE | /recipes/:id |                                   | Delete a recipe                |

## Flask endpoint

| Method | Endpoint | Data sent                            | Action              | Data expected                                            |
| ------ | -------- | ------------------------------------ | ------------------- | -------------------------------------------------------- |
| POST   | /recipes | `{ image: bites, vegetarian: bool }` | Create a new recipe | `{ title: string, body: string, ingredients: [string] }` |
