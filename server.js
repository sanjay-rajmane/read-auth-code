// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const cors = require("cors");

app.use(cors());

const connections = [
  {
    id: "c72e3b62-4f9e-4d28-a0c1-17b395fed822",
    provider: "salesforce",
    alias: "Salesforce Org Bar",
    user_identifier: "user_123",
    scopes: ["repo", "user:email"],
    provider_options: null,
    created_at: "2024-06-02T09:11:22.987654Z",
    server_name: "org1__salesforce",
    mcp_server_id: "193aaec1-a2e2-4976-80a0-29ea812f06b8",
    status: "connected",
  },
  {
    id: "9c8c159a-7ad2-4c70-a027-0efd4fb56e93",
    provider: "slack",
    alias: "Acme HQ Slack",
    user_identifier: "user_123",
    scopes: ["channels:read", "chat:write"],
    provider_options: null,
    created_at: "2024-05-30T12:34:56.123456Z",
    server_name: "org1__slack",
    mcp_server_id: "0245d7bd-2a17-4b99-b2c1-578bf9eef9c3",
    status: "pending",
  },
  {
    id: "b73e3b62-4f9e-4d28-a0c1-17b395fed829",
    provider: "github",
    alias: "GitHub Org Bar",
    user_identifier: "user_123",
    scopes: ["repo", "user:email"],
    provider_options: null,
    created_at: "2024-06-02T09:11:22.987654Z",
    server_name: "org1__github",
    mcp_server_id: "193aaec1-a2e2-4976-80a0-29ea812f05a7",
    status: "pending",
  },
];

// Serve static redirect page at /callback
app.get("/callback", (req, res) => {
  res.sendFile(path.join(__dirname, "callback.html"));
});

app.get("/servers", (req, res) => {
  res.json([
    {
      id: "0245d7bd-2a17-4b99-b2c1-578bf9eef9c3",
      name: "Slack Workspace Foo",
      provider: "slack",
      status: "pending", // one of: available | pending | connected
      connection_id: "9c8c159a-7ad2-4c70-a027-0efd4fb56e93",
    },
    {
      id: "193aaec1-a2e2-4976-80a0-29ea812f05a7",
      name: "GitHub Org Bar",
      provider: "github",
      status: "pending",
      connection_id: null, // null when not yet linked
    },
  ]);

  // res.json([]);
});

app.get("/connections", (req, res) => {
  res.json(connections);

  // res.json([]);
});

// DELETE: Set connection status to "pending"
app.delete("/connections/:id", (req, res) => {
  const id = req.params.id; // UUID as string

  const connection = connections.find((c) => c.id === id);

  if (!connection) {
    return res.status(404).json({ message: "Connection not found" });
  }

  connection.status = "pending";
  res.json({ message: "Status updated to pending", connection });
});

// POST: Set connection status to "available"
app.post("/connections/:id", (req, res) => {
  const id = req.params.id; // UUID as string

  const connection = connections.find((c) => c.id === id);

  if (!connection) {
    return res.status(404).json({ message: "Connection not found" });
  }

  connection.status = "connected";
  res.json({ message: "Status updated to connected", connection });
});

app.listen(PORT, () => {
  console.log(
    `OAuth redirect server running at http://localhost:${PORT}/callback`
  );
});
