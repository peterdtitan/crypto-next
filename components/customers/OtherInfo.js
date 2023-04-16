import React, { useState } from 'react';
import { Loading, Radio, Input, Textarea, Tooltip, Checkbox } from "@nextui-org/react";

function OtherInfo({ formData, setFormData, setSelectedCrypto }) {

    return (
        <div className="flex flex-col md:grid grid-cols-2 gap-x-8 md:w-[70%]  gap-y-6 md:gap-y-8 md:border md:border-1 md:border-gray-400 md:rounded-lg p-8 font-montserrat">
            <div className="text-left md:col-span-2 text-lg md:text-3xl font-thin">
              <h3>Setup your preferences</h3>
            </div>

            <div className="col-span-2">
                <Checkbox.Group
                  label="Select Crypto Interests"
                  orientation="horizontal"
                  color="warning"
                  size="md"
                  onChange={setSelectedCrypto}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Checkbox value="BTC-(Bitcoin)" size="sm">Bitcoin</Checkbox>
                    <Checkbox value="ETH-(Ethereum)" size="sm">Ethereum</Checkbox>
                    <Checkbox value="USDT" size="sm">Tether (USDT)</Checkbox>
                    <Checkbox value="BNB" size="sm">Binance Coin</Checkbox>
                    <Checkbox value="USDC" size="sm">US Dollar Coin</Checkbox>
                    <Checkbox value="XRP" size="sm">XRP</Checkbox>
                  </div>
                </Checkbox.Group>
            </div>

            <div className="col-span-2 flex flex-col">
                <label className="text-sm md:text-base text-slate-500">
                  Select an Investment Category<sup>*</sup>
                </label>
                <select
                  name="sex"
                  id="sex"
                  className="p-2 border-solid border rounded-md border-primaryYellow bg-primaryYellow/20 focus:outline-none mt-2"
                  onChange={(event) => {
                    setFormData({ ...formData, currentPlan: event.target.value });
                  }}
                >
                  <option value="Standard">Standard ($100-$1,999)</option>
                  <option value="Premium">Premium ($2,000-$4,999)</option>
                  <option value="Gold">Gold ($5,000-$9999)</option>
                  <option value="Diamond">Diamond ($10,000-$49,999)</option>
                  <option value="Elite">Elite (From $49,999 upwards)</option>
                </select>
            </div>

        </div>
    )
}

export default OtherInfo;