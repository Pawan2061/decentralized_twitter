"use client";
import React, { useEffect, useState } from "react";
import { getAccount } from "@wagmi/core";
import { config } from "@/lib/web3Config";
import { ethAddress } from "viem";

const ProfileBanner = () => {
  const { address } = getAccount(config);
  console.log(address, "address is here");

  return (
    <div className="relative w-full">
      <div className="w-full h-64 bg-blue-500"></div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="rounded-full h-24 w-24 bg-black border-4 border-white overflow-hidden">
          <h1>{address}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
