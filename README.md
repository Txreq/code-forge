<div style="text-align: center;">
  <h1>Code Forge</h1>
</div>

https://github.com/Txreq/code-forge/assets/58333332/37b34f78-ca35-4661-ad00-43bfe0adf651




Code Forge is an open-source project that aims to provide a customizable and extensible chatbot framework using Next.js
14. This project serves as a clone of ChatGPT, allowing developers to create and deploy their own conversational agents.

## Why not host it?
It ain't cheap.

## Used technologies:

- Next.js 14
- tRPC
- Prisma
- TailwindCSS
- <a href="https://ollama.ai/" target="_blank">OLLama</a>

# Installation
Make sure you install the `ollama` binary in your system and pull the `codellama` LLM
```
ollama pull codellama
```
Then run the script `./scripts/model.sh`
```
if [[ ollama ]]; then
  if [[ $(ollama l ist | grep "codellama:latest") ]]; then
    ollama create oscar -f ./.Modefile
  else
    echo "[ERR] codellama LLM isn't installed"
    echo "[INFO] run `ollama pull codellama`"
else
  echo "[ERR] ollama is not installed in this machine"
fi
```
Make sure everything is in working fine by running:
```
ollama run oscar "hello"
```
Finally, we do the usual boring stuff
```
git clone https://github.com/Txreq/code-forge
cd ./code-forge
pnpm install
```
