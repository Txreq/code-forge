if [[ ollama ]]; then
  ollama create oscar -f ./.Modefile
else
  echo "[ERR] ollama is not installed in this machine"
fi