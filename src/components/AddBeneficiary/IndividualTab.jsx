import Button from "../Elements/Button/Button";

export default function IndividualTab({
  onNext,
  onBack,
  onAdd,
  showActionBtn = true,
}) {
  const country = [
    { value: "1", label: "USA" },
    { value: "2", label: "UAE" },
  ];
  const currency = [
    { value: "1", label: "USD" },
    { value: "2", label: "BTC" },
  ];
  return (
    <>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="sortCode" className="block text-xs text-primary">
          Sort code
        </label>
        <input
          type="text"
          id="sortCode"
          placeholder="##-##-##"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
        />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="accountNumber" className="block text-xs text-primary">
          Account number
        </label>
        <input
          type="text"
          id="accountNumber"
          placeholder="########"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
        />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="firstName" className="block text-xs text-primary">
          First and middle names
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter first and middle names"
          className="block w-full h-9 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
        />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="lastName" className="block text-xs text-primary">
          Last name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter last name"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
        />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="email" className="block text-xs text-primary">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
        />
      </div>
      {showActionBtn && (
        <Button
          title="Add Beneficiary"
          className={"h-8 bg-gray-200 text-gray-400 w-full"}
          onNext={onAdd}
        />
      )}
    </>
  );
}
