const pendingList = document.getElementById("pending") as HTMLLIElement;
const approvedList = document.getElementById("approved") as HTMLLIElement;
const deniedList = document.getElementById("denied") as HTMLLIElement;
const allList = document.getElementById("all-reimbursements") as HTMLLIElement;

(async () => {
  const data = await fetch("http://localhost:8080/reimbursements");
  const reimbursements = await data.json();
  for (const reimbursement of reimbursements) {
    const resolved = `${
      reimbursement.resolvedAt
        ? "Resolved at: " +
          new Date(reimbursement.resolvedAt.epochSecond * 1000).toDateString()
        : "Awaiting approval from a Financial Manager"
    }`;
    const status = `${
      reimbursement.status === "APPROVED" ? "Approved" : "Rejected"
    }`;
    const resolver = `${
      reimbursement.resolver ? status + " By: " + reimbursement.resolver : ""
    }`;
    const section = document.createElement("section");
    section.classList.add("reimbursement");
    section.innerHTML = `
      <input type="hidden" value="${reimbursement.reimbursementId}" />
      <h2>Status: ${reimbursement.status}</h2>
      <h3>Author: ${reimbursement.author}</h3>
      <h3>Amount: $${new Number(reimbursement.amount).toFixed(2)}</h3>
      <h4 id="submittedAt">Submitted on: ${new Date(
        reimbursement.submittedAt.epochSecond * 1000
      ).toDateString()}</h4>
      <details>
        <summary>Full Report</summary>
        <div class="reimbursement__container">
          <div class="reimbursement__info">
            <h2>Type: ${reimbursement.type}</h2>
            <h3>${resolved}</h3>
            <h3>${resolver}</h3>
            <h3 class="reimbursement__description">Description: </h3>
            <p>
              ${reimbursement.description}
            </p>
            <select name="change-status" class="reimbursement__status">
              <option value="PENDING">Change status</option>
              <option value="APPROVED">Approve</option>
              <option value="DENIED">Deny</option>
            </select>
            <input type="hidden" value="${reimbursement.reimbursementId}" />
          </div>
          <figure>
            <img src="../assets/166-receipt.jpg" alt="receipt" />
            <figcaption>Receipt added by ${reimbursement.author}</figcaption>
          </figure>
        </div>
      </details>
    `;
    const statusSelect = section.querySelector(
      ".reimbursement__status"
    ) as HTMLSelectElement;
    statusSelect.addEventListener("change", updateReimbursement);
    mainEl.appendChild(section);
  }
})();

// TODO(jaymonari): Finish this!!!
async function updateReimbursement({ srcElement }) {
  const reimbursementId = srcElement.nextElementSibling.value;
  const statusId = srcElement.value;
  const reimbursement = {
    reimbursementId,
    statusId,
  };

  const response = await fetch("http://localhost:8080/reimbursements/update", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "error",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(reimbursement),
  }).catch(() => {
    window.location.href = "http://localhost:8080/login";
  });

  if (response.ok) {
    const resolver = await response.text();
    let section = srcElement;
    while (section.nodeName !== "SECTION") {
      section = section.parentNode;
    }

    const status = section.querySelector("h2");
    const resolvedAt = section
      .querySelector(".reimbursement__info")
      .querySelector("h3");
    const resolverEl = resolvedAt.nextElementSibling;
    status.innerHTML = `Status: ${statusId}`;
    resolvedAt.innerHTML = `Resolved at: ${new Date().toDateString()}`;
    resolverEl.innerHTML = `${statusId.toLowerCase()} By: ${resolver}`;
  }
}

function filterResults({ srcElement }) {
  const clickedStatus = srcElement.id.toUpperCase();

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove("hidden");
    const status = section.querySelector("h2");
    if (!status.innerHTML.includes(clickedStatus))
      section.classList.add("hidden");
  });
}

allList.addEventListener("click", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((s) => s.classList.remove("hidden"));
});

pendingList.addEventListener("click", filterResults);
approvedList.addEventListener("click", filterResults);
deniedList.addEventListener("click", filterResults);
