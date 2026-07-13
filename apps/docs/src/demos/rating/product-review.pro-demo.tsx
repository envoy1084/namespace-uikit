"use client";

// @demo-title Product Review
import { Rating } from "@thenamespace/uikit";

const Items = () => (
  <>
    {[1, 2, 3, 4, 5].map((value) => (
      <Rating.Item key={value} value={value} />
    ))}
  </>
);

export const ProProductReviewExample = () => (
  <div className="flex w-[300px] flex-col gap-4">
    {[
      { name: "Quality", rating: 4.5 },
      { name: "Value for money", rating: 3.7 },
      { name: "Design", rating: 5 },
      { name: "Durability", rating: 2.3 },
    ].map((item) => (
      <div className="flex items-center justify-between" key={item.name}>
        <span className="text-foreground text-sm">{item.name}</span>
        <div className="flex items-center gap-2">
          <Rating
            isReadOnly
            aria-label={`${item.name}: ${item.rating} stars`}
            size="sm"
            value={item.rating}
          >
            <Items />
          </Rating>
          <span className="text-muted w-7 text-right text-xs">
            {item.rating}
          </span>
        </div>
      </div>
    ))}
  </div>
);
