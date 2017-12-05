SOURCES = packages

.PHONY: help init build-all clean-all demo demo-build demo-deploy storybook storybook-build storybook-deploy deploy-all

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

init: ##@init cleanup/install/bootstrap
	make clean-all
	yarn install
	./node_modules/.bin/lerna bootstrap
	make build-all

deploy-all: ##@deploy deploy demo website & storybook
	@make demo-deploy
	@make storybook-deploy

build-all: ##@build build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	$(foreach source, $(SOURCES), $(call clean-source-lib, $(source)))
	./node_modules/.bin/lerna run --ignore nivo-demo --ignore nivo-example-retro build

########################################################################################################################
#
# CLEANUP
#
########################################################################################################################

clean-all: ##@cleanup uninstall node modules, remove transpiled code & lock files
	rm -rf node_modules
	rm -rf package-lock.json
	$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))

define clean-source-lib
	rm -rf $(1)/*/es
	rm -rf $(1)/*/lib
endef

define clean-source-all
	rm -rf $(1)/*/es
	rm -rf $(1)/*/lib
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef

########################################################################################################################
#
# DEMO
#
########################################################################################################################

demo: ##@demo start demo in dev mode
	@echo "${YELLOW}Starting demo${RESET}"
	@cd demo && yarn start

demo-build: ##@demo build demo
	@echo "${YELLOW}Building demo${RESET}"
	@cd demo && yarn build

demo-deploy: ##@demo build & deploy demo
	@make demo-build

	@echo "${YELLOW}Deploying demo${RESET}"
	@./node_modules/.bin/gh-pages -d demo/build -r git@github.com:plouc/nivo.git -b gh-pages

########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook: ##@storybook start storybook in dev mode on port 6006
	@./node_modules/.bin/start-storybook -p 6006

storybook-build: ##@storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@./node_modules/.bin/build-storybook

storybook-deploy: ##@storybook build and deploy storybook
	@make storybook-build

	@echo "${YELLOW}Deploying storybook${RESET}"
	@./node_modules/.bin/gh-pages -d storybook-static -r git@github.com:plouc/nivo.git -b gh-pages -e storybook
