import { EmailsItem } from "../pages/Home";

type EmailsTableProps = {
  emailsData: { data: EmailsItem[]; nextPage: string; previous: string };
  fetchEmails: (url: string) => void;
};

const EmailsTable = ({ emailsData, fetchEmails }: EmailsTableProps) => {
  if (!emailsData.data.length) {
    return <div>Loading....</div>;
  }
  return (
    <div className="emails-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Recipient</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {emailsData.data.map((email) => (
          <tr key={email.id}>
            <td>{email.id}</td>
            <td>{email.recipient}</td>
            <td>{email.subject}</td>
          </tr>
        ))}
      </tbody>
      <div className="pagination">
        <button onClick={() => fetchEmails(emailsData.previous)} disabled={!emailsData.previous}>
          prev
        </button>
        <button onClick={() => fetchEmails(emailsData.nextPage)} disabled={!emailsData.nextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default EmailsTable;
