if [[ ollama ]]; then
  if [[ $(ollama l ist | grep "codellama:latest") ]]; then
    ollama create oscar -f ./.Modefile
  else
    echo "[ERR] codellama LLM isn't installed"
    echo "[INFO] run `ollama pull codellama`"
else
  echo "[ERR] ollama is not installed in this machine"
fi