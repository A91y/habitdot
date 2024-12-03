import React from 'react';

const CategoryCard = ({ category, index, onClick }) => {
  return (
    <div
      key={index}
      className={`flex flex-col items-center justify-center h-[100px] rounded-[12px] ${category.disabled ? 'bg-gray-300' : 'bg-[#F6F6F2]'}`}
      onClick={() => {
        if (!category.disabled) {
          onClick();
        }
      }}
    >
      <div className="w-full flex justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="h-[40px] mb-2"
        />
      </div>
      <div className="font-bold text-[14px]">{category.name}</div>
      {category.disabled && (
        <div className="text-red-500 text-[10px]">
          Coming Soon...
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
