const reimbForm = document.getElementById("reimbForm") as HTMLFormElement;
const amount = document.getElementById("amount") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const receipt = document.getElementById("receipt") as HTMLInputElement;
const type = document.getElementById("type") as HTMLSelectElement;

interface ReimbersursementRequest {
  amount: string;
  description: string;
  typeId: string;
}

async function addReimbursement(e: Event) {
  e.preventDefault();

  const reimbursement: ReimbersursementRequest = {
    amount: new Number(amount.value).toFixed(2),
    description: description.value,
    typeId: type.value,
  };

  const response = await fetch("http://localhost:8080/reimbursement/add", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(reimbursement),
  });

  window.location.href = response.url;
}
reimbForm.addEventListener("submit", addReimbursement);
