import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-09/input");
const diskMap = input.split("");

const translateDiskMap = (diskMap: string[]) => {
  const translatedDiskMap: string[] = [];
  let id = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const isId = !(i % 2);
    const number = Number(diskMap[i]);

    if (isId) {
      for (let j = 0; j < number; j++) {
        translatedDiskMap.push(`${id}`);
      }
      id++;
      continue;
    }

    for (let j = 0; j < number; j++) {
      translatedDiskMap.push(".");
    }
  }

  return translatedDiskMap;
};

const swapMemory = (diskMap: string[]) => {
  const tempDiskMap = [...diskMap];
  let left = 0;
  let right = diskMap.length - 1;

  while (left < right) {
    while (left < tempDiskMap.length && tempDiskMap[left] !== ".") {
      left++;
    }

    while (right >= 0 && tempDiskMap[right] === ".") {
      right--;
    }

    if (left < right) {
      [tempDiskMap[left], tempDiskMap[right]] = [
        tempDiskMap[right],
        tempDiskMap[left],
      ];
    }
  }

  return tempDiskMap;
};

const excludeEmptyMemory = (diskMap: string[]) =>
  diskMap.filter((block) => block !== ".").map(Number);

const processChecksums = (diskMap: number[]) => {
  const checksums: number[] = [];

  for (let i = 0; i < diskMap.length; i++) {
    checksums.push(i * diskMap[i]);
  }

  return checksums;
};

const translatedDiskMap = translateDiskMap(diskMap);
const swappedDiskMap = swapMemory(translatedDiskMap);
const diskMapBlocks = excludeEmptyMemory(swappedDiskMap);
const checksums = processChecksums(diskMapBlocks);
const result = sum(checksums);

console.log(result);
