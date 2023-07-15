// Hàm nhập input là số là kiểm tra
function validateNumericInput(event) {
  const input = event.target;
  const value = input.value.trim();

  // Kiểm tra nếu giá trị là chữ "e" hoặc bắt đầu bằng "e" hoặc "-e"
  if (value === "e" || value.startsWith("e") || value.startsWith("-e")) {
    input.value = ""; // Xóa giá trị nhập vào
  } else {
    input.value = value.replace(/\D/g, ""); // Xóa các ký tự không phải số
  }
}