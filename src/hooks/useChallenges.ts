/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { getOngoingChallenges } from '../utils/api/challengeApi';
import { Challenge } from '../types/types';
import { getAllHabitDetails, getUserHabits } from '../utils/api/web3';
import useUserDetails from './useUserDetails';
import { useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';
import { toBigInt } from 'ethers';

const useChallenges = (bodyParams?: any) => {
  //example
  const challengesData = [
    {
      ChallengeID: '0',
      active: true,
      category: 'gym',
      depositAmount: 1,
      depositToken: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
      lastCheckIn: new Date('2024-12-02T04:25:00Z'),
      maxHabitDays: 30,
      rewardPoints: 0,
      startTime: new Date('2024-12-02T04:25:00Z'),
      streakDays: 0,
    },
    {
      ChallengeID: '1',
      active: false,
      category: 'bed',
      depositAmount: 2,
      depositToken: '0xABCDabcd1234EFGH5678ijklmnopQRSTuvwxYZ12',
      lastCheckIn: new Date('2024-11-28T03:15:00Z'),
      maxHabitDays: 15,
      rewardPoints: 20,
      startTime: new Date('2024-11-15T03:15:00Z'),
      streakDays: 5,
    },
    {
      ChallengeID: '2',
      active: true,
      category: "diet",
      depositAmount: 3,
      depositToken: '0x0987654321ABCDefGhijKLmnoPQRSTuvwxYZ4567',
      lastCheckIn: new Date('2024-12-01T10:00:00Z'),
      maxHabitDays: 20,
      rewardPoints: 10,
      startTime: new Date('2024-11-22T10:00:00Z'),
      streakDays: 3,
    },
    {
      ChallengeID: '3',
      active: false,
      category: 'quit-healthyfood',
      depositAmount: 5,
      depositToken: '0x1234567890abcdefABCDEF1234567890ABCDEF12',
      lastCheckIn: new Date('2024-11-25T06:00:00Z'),
      maxHabitDays: 10,
      rewardPoints: 5,
      startTime: new Date('2024-11-20T06:00:00Z'),
      streakDays: 1,
    },
    {
      ChallengeID: '4',
      active: false,
      category: 'screentime-4',
      depositAmount: 5,
      depositToken: '0x1234567890abcdefABCDEF1234567890ABCDEF12',
      lastCheckIn: new Date('2024-11-25T06:00:00Z'),
      maxHabitDays: 10,
      rewardPoints: 5,
      startTime: new Date('2024-11-20T06:00:00Z'),
      streakDays: 1,
    },
    {
      ChallengeID: '3',
      active: false,
      category: "meditation",
      depositAmount: 5,
      depositToken: '0x1234567890abcdefABCDEF1234567890ABCDEF12',
      lastCheckIn: new Date('2024-11-25T06:00:00Z'),
      maxHabitDays: 10,
      rewardPoints: 5,
      startTime: new Date('2024-11-20T06:00:00Z'),
      streakDays: 1,
    },
  ];
  
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState('');
  const [userHabit, setUserHabit] = useState(null);
  const { userDetails } = useUserDetails();
  const { walletProvider } = useAppKitProvider('eip155');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // console.log(`Fetching challenges with status: ${status}...`);
        // const response = await getOngoingChallenges({
        //   status: "UPCOMING",
        //   limit: 10,
        //   offset: (bodyParams?.page ?? 0) * 10,
        // });
        // console.log("userhabits", userDetails?.User?.WalletAddress);
        // console.log(
        //   "yo",
        //   await getAllHabitDetails(
        //     userDetails?.User?.WalletAddress,
        //     new BrowserProvider(walletProvider)
        //   )
        // );

        // console.log("Challenges response:", response);
        // if (response.data.length === 0 || response.data.length < 10) {
        //   bodyParams.setMoreChallengesButton(false);
        // }
        // if (response.success) setChallenges([...challenges, ...response.data]);
        setChallenges(
          await getAllHabitDetails(
            userDetails?.User?.WalletAddress,
            new BrowserProvider(walletProvider)
          )
        );
        //example
        // setChallenges(challengesData);
        // setChallenges(challengesData);
        // setUserHabit(await getUserHabits(userDetails?.User?.WalletAddress));
      } catch (error) {
        // console.error("Failed to fetch challenges:", error);
        setError('Failed to fetch challenges: ' + error);
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, [bodyParams.page, userDetails?.User?.WalletAddress]);

  return { challenges, error, isLoading };
};

export default useChallenges;
