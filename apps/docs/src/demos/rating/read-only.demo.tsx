"use client";

// @demo-title Read Only
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

const fractionalValues = [1.5, 2.3, 3.7, 4.2, 4.8];

function FractionalRatings() {
  return (
    <div className="flex flex-col gap-4">
      {fractionalValues.map((value) => (
        <div className="flex items-center gap-3" key={value}>
          <Rating
            isReadOnly
            aria-label={`${value} out of 5 stars`}
            value={value}
          >
            <Items />
          </Rating>
          <span className="text-muted text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}

export const DemoReadOnlyExample = () => <FractionalRatings />;
