const Rating = ({ value, caption }: { value: number; caption?: string }) => {
  const Full = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-yellow-500 w-5 h-auto fill-current"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  const Half = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-yellow-500 w-5 h-auto fill-current"
      viewBox="0 0 16 16"
    >
      <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256zM8 12.027l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223V12.027z" />
    </svg>
  );

  const Empty = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-yellow-500 w-5 h-auto fill-current"
      viewBox="0 0 16 16"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73z" />
    </svg>
  );

  const renderStar = (index: number) => {
    if (value >= index + 1) return <Full key={index} />;
    if (value >= index + 0.5) return <Half key={index} />;
    return <Empty key={index} />;
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => renderStar(i))}
      </div>

      {caption && <span className="text-sm">{caption}</span>}
    </div>
  );
};

export default Rating;