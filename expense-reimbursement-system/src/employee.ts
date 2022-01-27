const mainEl = document.querySelector("main") as HTMLDivElement;

interface ReimbursementResponse {
  status: string;
  resolver: string;
  amount: string;
  type: string;
  description: string;
  submittedAt: Instant;
  resolvedAt: Instant;
}

interface Instant {
  epochSecond: number;
}

(async () => {
  const data = await fetch("http://localhost:8080/employees/reimbursements");
  const reimbursements: ReimbursementResponse[] = await data.json();
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
      reimbursement.resolver
        ? "<h3>" + status + " By: " + reimbursement.resolver + "</h3>"
        : ""
    }`;
    const section = document.createElement("section");
    section.classList.add("reimbursement");
    section.innerHTML = `
        <h2>Status: ${reimbursement.status}</h2>
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
              ${resolver}
              <h3 class="reimbursement__description">Description: </h3>
              <p>
                ${reimbursement.description}
              </p>
            </div>
            <figure>
              <img src="../assets/166-receipt.jpg" alt="receipt" />
              <figcaption>Receipt added by employee</figcaption>
            </figure>
          </div>
        </details>
    `;
    mainEl.appendChild(section);
  }
})();
