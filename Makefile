install:
	npm install && pip install -r requirements.txt

.PHONY: dev
dev:
	npm run start

.PHONY: lint
lint: flake eslint

.PHONY: eslint
eslint:
	eslint client/**/*.js

.PHONY: flake
flake:
	flake8 **/*.py

.PHONY: test
test: lint pytest

.PHONY: pytest
pytest: install
	PYTHONPATH=server py.test --cov-config .coveragerc --cov-report=term-missing --cov=server server/test/ -v

.PHONY: webpack
webpack:
	./node_modules/webpack/bin/webpack.js -p

.PHONY: start
start:
	python server.py

.PHONY: clean-start
clean-start: install webpack start
