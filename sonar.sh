apt update
apt install --yes curl

rm -f /usr/src/.sonar_token
touch /usr/src/.sonar_token

while [ "$(curl -s -o /dev/null -w ''%{http_code}'' "$SONAR_HOST_URL/api/authentication/validate")" != "200" ]; do
  echo "Waiting for network map at url ($SONAR_HOST_URL) to respond, retry in 5 seconds..."
  sleep 5
done

while [ ! -s /usr/src/.sonar_token ]; do
  echo "Waiting for sonar token, retry in 5 seconds..."
  sleep 5
done

echo "Token found, Sonar is going to analyze the project..."
sleep 10

su scanner-cli

. /usr/src/.sonar_token

/usr/bin/entrypoint.sh