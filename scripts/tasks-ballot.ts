// Class 8: Running operations scripts
// https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-08?tab=readme-ov-file#running-operations-scripts

/**
 * This module consolidates independent functions that assignVoter, castVote, getWinner, queryUsers
 * 
 */


import { publicClient, walletClient } from "./config";
import { abi, /*bytecode */ } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { Address, formatEther, toHex, hexToString } from "viem";
import * as readline from "readline";



// const inputs = process.argv.slice(2);
// const contractAddress  = inputs[0] as `0x${string}`;


// TODO: include JS docbloc for all functiuons.  Mimic PHP standards:
    // 1 line description
    // @params variableName -  type and descripton
    // any return values and type}

// TODO: Wrap all functions in try-catch blocs
const test = async (voterAddress: `0x${string}`) => {


    const isConfirmed = await confirmAction(`Do you want to continue?`);
    if (!isConfirmed) {
        console.log("Operation cancelled by the user.");
        process.exit(0);
    }

     console.log("You decided to continue.");

    console.log("Address sent as argument", voterAddress)

	const blockNumber = await publicClient.getBlockNumber(); // test public client
	console.log("Last block number:", blockNumber);	// test public client

	console.log("User address:", walletClient.account.address);

		const balance = await publicClient.getBalance({
			address: walletClient.account.address,
		});

	console.log( "User balance:", formatEther(balance), walletClient.chain.nativeCurrency.symbol )



}


/**
 * CLI function to verify user inputs. depends on import * as readline from "readline";
 * @param message - The confirmation message.
 * @returns Promise resolving to true if confirmed, false otherwise.
 *
 * Modified from @fang10000
 * @see https://github.com/EncodeClub-EVMBootcamp24Q4-Group2/project2/blob/zzproject2/scripts/Delegate.ts#L16-L28
 */
 const confirmAction = async (message: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      rl.close();
      //resolve(answer.trim().toLowerCase() === "y");
      resolve(answer.trim() != "n");
    });
  });
}



// https://discord.com/channels/@me/1299375022737063979/1302259032031236211
// npx ts-node call-any-function.ts tasks-ballot.ts.ts/assignVoter/0xe429F5E3A91b4932aE3022de3E3Ca0F6A911eECa/0x92620b62E21193ed7A0f36915522EFab5049A718
const assignVoter = async (voterAddress: Address, contractAddress: Address,) => {

    //const voterAddress    = inputs[1] as `0x${string}`;

    // if (!contractAddress) 
    //     throw new Error("Contract address not provided");

    // if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    //     throw new Error("Invalid contract address");

    let allowVotingHash = await walletClient.writeContract({
        abi: abi,
        address: contractAddress, // OR USE: as `0x${string}`
        functionName: "giveRightToVote",
        args:[ voterAddress ]
    });


	console.log("Transaction hash:", allowVotingHash);
	console.log("Waiting for confirmations...");
	let receipt = await publicClient.waitForTransactionReceipt({ hash: allowVotingHash });
	console.log("Below is the receipt object for voter: ", voterAddress);
    console.log("Transaction receipt object: ", receipt);


}

// npx ts-node call-any-function.ts tasks-ballot.ts.ts/castVote/1/0x92620b62E21193ed7A0f36915522EFab5049A718
const castVote = async ( proposalIndex: BigInt, contractAddress: `0x${string}` ) => {

  //  const proposalIndex = inputs[0] as BigInt;

    if (!contractAddress) 
        throw new Error("Contract address not provided");

    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
        throw new Error("Invalid contract address");

    if (isNaN(Number(proposalIndex))) 
        throw new Error("Invalid proposal index");


    const proposal = ( await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "proposals",
        args: [proposalIndex],
    })) as any[];

    const name = hexToString(proposal[0], { size: 32 });
    console.log("Voting on proposal:", name);


    const voteHash = await walletClient.writeContract({
        abi: abi,
        address: contractAddress!, // OR USE: as `0x${string}`
        functionName: "vote",
        args:[proposalIndex]  // BigInt(proposalIndex) 
    });

    
 	console.log("Transaction hash:", voteHash);
	console.log("Waiting for confirmations...");
	let receipt = await publicClient.waitForTransactionReceipt({ hash: voteHash });
	console.log(receipt.from, "has successfully Voted for ", name );
    
}


const delegatePower = async ( delegateAddress: Address, contractAddress: Address ) => {

    const delegateHash = await walletClient.writeContract({
        abi: abi,
        address: contractAddress,
        functionName: "delegate",
        args: [delegateAddress],
    });

}



// npx ts-node call-any-function.ts tasks-ballot.ts/queryUsers/0x92620b62E21193ed7A0f36915522EFab5049A718
const queryUsers = async ( contractAddress: `0x${string}` ) => {

    // struct Voter {
    //     uint weight; // weight is accumulated by delegation
    //     bool voted;  // if true, that person already voted
    //     address delegate; // person delegated to
    //     uint vote;   // index of the voted proposal
    // }


    // // This declares a state variable that stores a `Voter` struct for each possible address.
    // mapping(address => Voter) public voters;
    // must know voter address a priori to query their specific "profile"
    // use this: https://sepolia.etherscan.io/address/0x92620b62e21193ed7a0f36915522efab5049a718

    let addressArray: string[] = ['0x9E3885eCcDc7E6F61B291B03838313F83799e03A', '0x1c218834059Df5C5BB0421E28A131Aa5Ee3cbc95', '0xe429F5E3A91b4932aE3022de3E3Ca0F6A911eECa'];
    let i = 0;

    //https://www.google.com/search?client=opera&q=asynch+foreach+loop+in+tyspescript
    // forEach doesn't directly support async/await. achieve similar functionality in TypeScript using the for...of loop
    for (const singleAddress of addressArray ) {
        i++;
        const userProfiles = await publicClient.readContract({
            address: contractAddress,
            abi,
            functionName: "voters", //this is actually reading  state variable, not a function!
            args: [singleAddress]
        }) as any[]// any[];
        
        const[ weight, voteStatus, delegate, proposalIndex ] = userProfiles
        console.log("Voter", singleAddress, "profile:")
        ///console.log({ userProfiles  });
        console.log("Voting Weight:", weight, ", Already Vote?:",  voteStatus, ", Delegated Address:", delegate, ", Prposal Voted For:",  proposalIndex )
        console.log(" ")
    }
}




// npx ts-node call-any-function.ts tasks-ballot.ts/getWinner/0x92620b62E21193ed7A0f36915522EFab5049A718
const getWinner = async ( contractAddress: `0x${string}` ) => {

    const winner = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winnerName",
    }) as `0x${string}`// any[];
    
	const name = hexToString(winner, { size: 32 });
    console.log("The winning proposal is:", name )

    return name;
}

// npx ts-node call-any-function.ts tasks-ballot.ts/queryProposal/0x92620b62E21193ed7A0f36915522EFab5049A718
const queryProposal = async ( contractAddress: `0x${string}` ) => {

	//4a. Manually Query Public Variables
	/**
	 * Hack to access Solidity array without a getter
	 * 
	 * 1. Public solidity arrays cannot be directly accessed on client if not explicity 
	 *     returned with a getter function
	 * 
	 * 2. Therefore must resort to this while loop hack to access it
	 * 
	 * 3. Takeaway:  Add getter functions to your solidity arrays
     * 
     * read a Solidity array element with "viem" send element index as argument parameter
	 */
	 let i: number = 0
	 let proposalArrOfObj: any[] =[] //https://learnxinyminutes.com/docs/typescript/
	 let tempObject: any[]
 
	while (true) {

    console.log("Index:", i)
		try {
			tempObject = await publicClient.readContract({
            address: contractAddress,
            abi: abi,
            functionName: "proposals",
            args: [i]
        }) as  any[]
			
			if (tempObject) {
				//console.log("Proposal Inside Loop", proposalArrOfObj);
               // console.log("Proposal Inside Loop", tempObject);
				proposalArrOfObj.push({
					name: hexToString(tempObject[0], { size: 32 }),
					votesReceived: Number( tempObject[1] ) //get rid of "n" big number notation. see: https://stackoverflow.com/a/53970656/946957
					})
				i++
			}

		} catch (e) {

       // console.log(e)
			break;
		}	
	}
	//Sorting and Array of JS Objects by a Specific Key: https://stackoverflow.com/a/979289/946957
	proposalArrOfObj.sort((a, b) => parseFloat(b.votesReceived) - parseFloat(a.votesReceived));
	console.log("QUERY 1. Historical Snapshot of Proposal Status Sorted in Descending Order:",  proposalArrOfObj)
	console.log("QUERY 2. Historical Winning Proposal: " + await getWinner( contractAddress ) )


}

//Named Exports
export { test, assignVoter, castVote, getWinner, queryUsers, queryProposal }



// async function main() {

//     // Receiving parameters
//     const parameters = process.argv.slice(2);

//     if (!parameters || parameters.length < 2)
//         throw new Error("Parameters not provided");

//     const contractAddress = parameters[0] as `0x${string}`;

//     if (!contractAddress) 
//         throw new Error("Contract address not provided");

//     if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
//         throw new Error("Invalid contract address");

//     const proposalIndex = parameters[1];

//     if (isNaN(Number(proposalIndex))) 
//         throw new Error("Invalid proposal index");


//     // Attaching the contract and checking the selected option
//     console.log("Proposal selected: ");

//     const proposal = ( await publicClient.readContract({
//         address: contractAddress,
//         abi,
//         functionName: "proposals",
//         args: [BigInt(proposalIndex)],
//     })) as any[];

//     const name = hexToString(proposal[0], { size: 32 });

//     console.log("Voting to proposal", name);
//     console.log("Confirm? (Y/n)");



//     // Sending transaction on user confirmation
//     const stdin = process.openStdin();

//     stdin.addListener("data", async function (d) {

//         if (d.toString().trim().toLowerCase() != "n") {

//             const hash = await voter.writeContract({
//                 address: contractAddress,
//                 abi,
//                 functionName: "vote",
//                 args: [BigInt(proposalIndex)],
//             });
//             console.log("Transaction hash:", hash);
//             console.log("Waiting for confirmations...");
//             const receipt = await publicClient.waitForTransactionReceipt({ hash });
//             console.log("Transaction confirmed");

//         } else {

//             console.log("Operation cancelled");

//         }

//         process.exit();

//     });


//     // Write
//     const allowVoting = await walletClient.writeContract({
//         abi: abi,
//         address: contractAddress!,
//         functionName: "giveRightToVote",
//         args:[]
//     });

//     await publicClient.waitForTransactionReceipt({ hash: counterHash });


//     // Read
//     let counterPosition = await publicClient.readContract({
//         abi: abi,
//         address: contractAddress!,
//         functionName: "getCounter",
//     });

//     console.log(`Current counter - ${counterPosition}.... Incrementing....`);


// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });