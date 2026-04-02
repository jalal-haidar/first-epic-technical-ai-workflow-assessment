# API Documentation

## Base URL

```
http://localhost:3000
```

---

## Endpoints

### GET `/api/users`

Returns a paginated list of users, with optional search filtering.

#### Query Parameters

| Parameter | Type   | Default | Description                             |
| --------- | ------ | ------- | --------------------------------------- |
| `page`    | number | `1`     | Page number (1-indexed)                 |
| `limit`   | number | `10`    | Number of records per page              |
| `search`  | string | —       | Filter users by name (case-insensitive) |

#### Response

```json
{
  "success": true,
  "count": 5000,
  "page": 1,
  "limit": 10,
  "totalPages": 500,
  "data": [
    {
      "id": "1",
      "name": "User 1",
      "role": "Member",
      "status": "Offline",
      "lastLogin": "2026-03-15T08:30:00.000Z"
    }
  ]
}
```

#### Response Fields

| Field        | Type    | Description                                |
| ------------ | ------- | ------------------------------------------ |
| `success`    | boolean | Whether the request was successful         |
| `count`      | number  | Total number of matching records           |
| `page`       | number  | Current page number                        |
| `limit`      | number  | Records per page                           |
| `totalPages` | number  | Total number of pages                      |
| `data`       | array   | Array of user objects for the current page |
