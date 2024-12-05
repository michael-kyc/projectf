function NotificationsCard({ ImageUrl, title, subTitle, trailing }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center">
        <div className="mr-4 shrink-0">
          {/* <img className="w-8 h-8" src={imageUrl} alt={imageUrl} /> */}
          {ImageUrl }
        </div>
        <div>
          <div className="text-sm font-medium text-textBlack">{title}</div>
          <p className="text-xs text-textLight">{subTitle}</p>
        </div>
      </div>
      <p className="text-xs text-textLight">{trailing}</p>
    </div>
  );
}

export default NotificationsCard;
