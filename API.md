# Sankalp API Documentation

## Base URL
`http://<server-ip>:8000/api`

## Endpoints

### Generate Tasks
- **URL**: `/generate`
- **Method**: `POST`
- **Rate Limit**: 5 requests / minute
- **Body**: 
  ```json
  { "notes": "Meeting notes text..." }
  ```
- **Response**: Array of created Task objects.

### Get Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Query Params**: `page` (int, default=1), `size` (int, default=10)
- **Rate Limit**: 60 requests / minute
- **Response**:
  ```json
  {
    "items": [ { "id": 1, "task": "...", "status": "Pending" } ],
    "total": 42,
    "page": 1,
    "size": 10,
    "total_pages": 5
  }
  ```

### Update Task
- **URL**: `/tasks/{task_id}`
- **Method**: `PUT`
- **Body**: Partial Task object
- **Response**: Updated Task object.

### Delete Task
- **URL**: `/tasks/{task_id}`
- **Method**: `DELETE`
- **Response**: `{ "ok": true }`
