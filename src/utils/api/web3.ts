import { BrowserProvider, ethers } from "ethers";

import contract from "../abi/HabitDotV3.json";
import { CONTRACT_ADDRESS } from "../constants/contract";

// Replace these with your contract's actual details
const CONTRACT_ABI = contract.abi;

// Initialize provider and contract
// const getProvider = () => {
//   if (!window.ethereum) throw new Error("Ethereum provider not found.");
//   return new BrowserProvider(walletProvider);
// };

const getContract = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

// ** Functions **

// 1. Create a habit with native tokens (ETH/Moonbeam)
export const startHabitWithNative = async (
  maxDays: number,
  category: string,
  depositAmount: ethers.BigNumberish,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.startHabitWithNative(maxDays, category, {
      value: depositAmount,
    });
    await tx.wait();
    console.log("Habit started successfully!");
    return tx;
  } catch (error) {
    console.error("Error starting habit with native token:", error);
    throw error;
  }
};

// 2. Create a habit with ERC20 tokens (xcDOT)
export const startHabitWithToken = async (
  maxDays: number,
  category: string,
  depositAmount: string,
  provider: BrowserProvider
): Promise<any> => {
  console.log("Starting habit with token...");
  try {
    const depositAmount_ = ethers.parseUnits(depositAmount, 10);
    console.log("Parsed deposit amount:", depositAmount_);
    const contract = await getContract(provider);
    const signer = await provider.getSigner();

    // Create ERC20 contract instance
    const tokenContract = new ethers.Contract(
      "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      signer
    );
    // Step 1: Approve the smart contract to spend tokens
    console.log(`Approving ${CONTRACT_ADDRESS} to spend tokens...`);
    const approveTx = await tokenContract.approve(
      CONTRACT_ADDRESS,
      depositAmount_
    );
    await approveTx.wait();
    console.log("Token approval successful!");

    const tx = await contract.startHabitWithDOT(
      depositAmount_,
      maxDays,
      category
    );
    await tx.wait();
    console.log("Habit started successfully with token!");
    // return tx;
  } catch (error) {
    console.error("Error starting habit with token:", error);
    throw error;
  }
};

// 3. Get all habits for the user
export const getUserHabits = async (
  userAddress: string,
  provider: BrowserProvider
): Promise<any[]> => {
  try {
    const contract = await getContract(provider);
    const habitIds = await contract.getUserHabits(userAddress);
    console.log("Fetched habit IDs:", habitIds);
    return habitIds.map((id: ethers.BigNumberish) => id.toString());
  } catch (error) {
    console.error("Error fetching user habits:", error);
    throw error;
  }
};

// 4. Get details of a specific habit
export const getHabitDetails = async (
  userAddress: string,
  habitId: number,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const details = await contract.getHabitDetails(userAddress, habitId);
    console.log("Habit details:", details);
    return {
      depositAmount: Number(details.depositAmount.toString()) / 1e10,
      depositToken: details.depositToken.toString(),
      startTime: BNToDate(details.startTime),
      lastCheckIn: BNToDate(details.lastCheckIn),
      streakDays: Number(details.streakDays),
      rewardPoints: Number(details.rewardPoints) / 1e10,
      active: details.active,
      maxHabitDays: Number(details.maxHabitDays),
      category: details.category,
    };
  } catch (error) {
    console.error("Error fetching habit details:", error);
    throw error;
  }
};

export const getAllHabitDetails = async (
  userAddress: string,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const userHabits = await getUserHabits(userAddress, provider);
    console.log("User habits:", userHabits);
    const habits: any[] = [];
    for (let i = 0; i < userHabits.length; i++) {
      const habitDetails = await getHabitDetails(
        userAddress,
        userHabits[i],
        provider
      );
      habits.push({ ChallengeID: userHabits[i], ...habitDetails });
    }
    return habits;
  } catch (error) {
    console.error("Error fetching all habit details:", error);
    throw error;
  }
};

// 5. Submit a check-in request
export const submitCheckIn = async (
  habitId: number,
  proofUrl: string,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.checkIn(habitId, proofUrl);
    await tx.wait();
    console.log("Check-in submitted successfully!");
    return tx;
  } catch (error) {
    console.error("Error submitting check-in:", error);
    throw error;
  }
};

// 6. Get pending check-in approvals for a validator (if applicable)
export const getPendingApprovals = async (
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const approvals = await contract.getPendingApprovals();
    console.log("Pending approvals:", approvals);
    return approvals;
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    throw error;
  }
};

export const abandonHabit = async (
  habitId: number,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const tx = await contract.abandonHabit(habitId);
    await tx.wait();
    console.log("Habit abandoned successfully!");
    return tx;
  } catch (error) {
    console.error("Error abandoning habit:", error);
    throw error;
  }
};

export const getProofStatus = async (
  user: string,
  habitId: number,
  provider: BrowserProvider
): Promise<any> => {
  try {
    const contract = await getContract(provider);
    const proof = await contract.proofs(user, habitId);
    console.log("Proof status:", proof.status);
    return proof.status; // unhandled, approved, unapproved
  } catch (error) {
    console.error("Error fetching proof status:", error);
    throw error;
  }
};

function BNToDate(bn: ethers.BigNumberish): Date {
  return new Date(Number(bn) * 1000);
}

export const approveToken = async (
  depositAmount: string,
  provider: BrowserProvider
) => {
  try {
    const signer = await provider.getSigner();
    const tokenContract = new ethers.Contract(
      "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      signer
    );

    const depositAmount_ = ethers.parseUnits(depositAmount, 10);
    const approveTx = await tokenContract.approve(
      CONTRACT_ADDRESS,
      depositAmount_
    );
    await approveTx.wait();
    console.log("Tokens approved successfully!");
  } catch (error) {
    console.error("Error during token approval:", error);
    throw error;
  }
};

export const transferTokensToStartHabit = async (
  maxDays: number,
  category: string,
  depositAmount: string,
  provider: BrowserProvider
) => {
  try {
    const contract = await getContract(provider);
    const depositAmount_ = ethers.parseUnits(depositAmount, 10);
    const tx = await contract.startHabitWithDOT(
      depositAmount_,
      maxDays,
      category
    );
    await tx.wait();
    console.log("Habit started successfully!");
  } catch (error) {
    console.error("Error during token transfer:", error);
    throw error;
  }
};
