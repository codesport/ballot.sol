# Overview
Two scripts, `call-any-Function.ts`  and `task-ballot.ts`, are used to execute read and write functions within `Ballot.sol`.  [`call-any-Function.ts`](scripts/call-any-function.ts) is a wrapper that parses arguments and calls a function in a given file



# Give Voting Rights

In this scenario [DAaJDn] @codesport performed actions as the Ballot.sol "chairperson".  The following was run from the CLI to give each team member voting rights:

`$ npx ts-node call-any-function.ts task-ballot.ts/assignVoter/<userWalletAddress>/<ballotContractAddress>`

where:
`ballotContractAddress` = [0x92620b62E21193ed7A0f36915522EFab5049A718](https://sepolia.etherscan.io/address/0x92620b62E21193ed7A0f36915522EFab5049A718)

Below are screenshots and transaction hashes of these actions:

+ [ExqPpl] @pondskai
   - [0x31c17ede44b91518d6501faeeca94281f59897b645d234b15c95e013e144e09](https://sepolia.etherscan.io/tx/0x31c17ede44b91518d6501faeeca94281f59897b645d234b15c95e013e144e094)
   ![voting privileges 1](https://media.discordapp.net/attachments/1299375022737063979/1302519761757933651/kai-assign-vote.png?ex=6728698e&is=6727180e&hm=ee2c966fb1c9b3d31f9c521b900363ab9fe1d79feeedc07a0dfe4c2c0f2d3cef&=&format=webp&quality=lossless&width=961&height=373)

+ [tJnNuQ] @maomaosaosao 

+ [R9dhTD] @brianblank 

  - https://sepolia.etherscan.io/tx/0xed20f6da03fae521e82295062b116597f3b99e6d04a272d8c528c1303c3edf8f
  ![voting privileges 5](https://media.discordapp.net/attachments/1299375022737063979/1302523703313305630/brian-assign-vote.png?ex=67286d3a&is=67271bba&hm=0d2e8bb943cc53e4f872c841525a0f67a19aa6de31f0ef18c91e826f2ab6d7ad&=&format=webp&quality=lossless&width=966&height=373)
+ [DAaJDn] @codesport 

+ [lofjwH] @fang10000

   - [0x06ea427dac4897137e235e6b190e279f1544dead57a233bba6292c45d97ead4c](https://sepolia.etherscan.io/tx/0x06ea427dac4897137e235e6b190e279f1544dead57a233bba6292c45d97ead4c) 
   ![voting privileges 2](https://cdn.discordapp.com/attachments/1299375022737063979/1302518198066745364/zicoffee-assign-vote.png?ex=6728681a&is=6727169a&hm=2b33bee0170f69562af8f7a2fab50e2768b390eb0f0d6a5715ff3af906ecc8ff&)

+ [Mn8EN0] @ethalorian
    - [0x31c17ede44b91518d6501faeeca94281f59897b645d234b15c95e013e144e094](https://sepolia.etherscan.io/tx/0x31c17ede44b91518d6501faeeca94281f59897b645d234b15c95e013e144e094)  
   ![voting privileges 4](https://media.discordapp.net/attachments/1299375022737063979/1302522657862058015/ethlorian-assign-vote.png?ex=67286c41&is=67271ac1&hm=1b202ae9cc6ebd5079c034d3057c216b1a47162fb11433385093513b8729f22c&=&format=webp&quality=lossless&width=989&height=373)

+ [HPJ2do] @DiegoB1911 
   - https://sepolia.etherscan.io/tx/0xc801ac3f3f27d7138559cf09d979816a992753a55150af575ef171cab88c6252
   ![voting privileges 3](https://media.discordapp.net/attachments/1299375022737063979/1302521488384983103/diego-assign-vote.png?ex=67286b2a&is=672719aa&hm=8786e537f9e38e6095d543897562d3c8ec373065f2edf5b2a5c2a97ac5bf5b2d&=&format=webp&quality=lossless&width=954&height=373)






# Casting Votes

# Delegating Votes

# Querying Results


# Function Calls

## xyz  Function Call

## abc Function Call

## 123 Function Call