<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// CONFIGURATION - तपाईको इन्फिनिटीफ्री डेटाबेसको विवरणहरू
$host = "sql113.infinityfree.com"; 
$user = "if0_42090642";
$pass = "S3nctpLzKRkoMkg"; // <-- यहाँ आफ्नो MySQL Password हाल्नुहोस्
$dbname = "if0_42090642_chat";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$action = $_GET['action'] ?? '';

// १. सन्देश पठाउँदा (POST Request)
if ($action == 'send' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $sender = $_POST['sender'] ?? '';
    $receiver = $_POST['receiver'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!empty($sender) && !empty($receiver) && !empty($message)) {
        $stmt = $conn->prepare("INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $sender, $receiver, $message);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Insert failed"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Empty fields"]);
    }
}

// २. च्याट लोड गर्दा (GET Request)
if ($action == 'fetch') {
    $user1 = $_GET['user1'] ?? '';
    $user2 = $_GET['user2'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY timestamp ASC");
    $stmt->bind_param("ssss", $user1, $user2, $user2, $user1);
    $stmt->execute();
    $result = $stmt->get_result();

    $chat = [];
    while ($row = $result->fetch_assoc()) {
        $chat[] = [
            "text" => $row['message'],
            "type" => ($row['sender'] == $user1) ? "sent" : "received",
            "time" => $row['timestamp']
        ];
    }
    echo json_encode($chat);
    $stmt->close();
}

$conn->close();
?>