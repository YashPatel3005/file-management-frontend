import React from "react";
import ComponentCard from "./ComponentCard";
import Input from "./InputField";

export default function InputGroup() {
  return (
    <ComponentCard title="Input Group">
      <div className="space-y-6">
        <div>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
