
set -e

BROWSER=${1:-all}

echo "🐳 Executando testes E2E no Docker..."
echo "Browser: $BROWSER"

case $BROWSER in
  chromium|firefox|webkit)
    echo "Executando testes apenas no $BROWSER..."
    docker-compose run --rm playwright-tests npm run test:$BROWSER
    ;;
  all|*)
    echo "Executando todos os testes..."
    docker-compose run --rm playwright-tests
    ;;
esac

echo "✅ Testes concluídos!"
echo "📊 Visualize o relatório com: npm run test:report"


