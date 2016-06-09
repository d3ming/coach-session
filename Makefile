install:
	pip install -r requirements.txt


.PHONY: lint
lint: flake eslint

.PHONY: eslint
eslint:
	eslint client/**/*.js

.PHONY: flake
flake:
	flake8 **/*.py

.PHONY: pytest
pytest: install
	PYTHONPATH=server py.test --cov-config .coveragerc --cov-report=term-missing --cov=server server/test/ -v

.PHONY: webpack
webpack:
	webpack -p

.PHONY: start
start: install webpack
	python server.py
