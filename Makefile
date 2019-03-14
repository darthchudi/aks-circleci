NAME := ${REGISTRY}/${NAMESPACE}/${APP_NAME}
ifeq (${CIRCLE_BRANCH}, master)
	TAG := latest-${CIRCLE_SHA1}
else
	TAG := ${CIRCLE_BRANCH}
endif
IMG := ${NAME}:${CIRCLE_SHA1}
LATEST := ${NAME}:${TAG}
HELM_ARGS := --set image.repository=${NAME} --set image.tag=${TAG} --set app.node_env=${APP_ENV} 

.PHONY: push
push: login build
	@echo "Pushing image"
	@docker push ${LATEST}

# Login to ACR
.PHONY: login
login:
	@echo ${SP_PASSWORD} | docker login ${REGISTRY} --username ${SP_ID} --password-stdin

# Build and tag image
.PHONY: build
build:
	@echo "Building and tagging image"
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

.PHONY: deploy
deploy: init-helm
	@echo "Installing app in K8s cluster"
	@helm repo add <InsertHelmRepoName> https://<InsertHelmRepoName>.github.io/helm-charts
	@helm repo update
	# Uncomment the line to below to force the pods to be recreated
	# @helm upgrade ${APP_NAME} <InsertHelmRepoName>/${APP_NAME} --install --debug --recreate-pods ${HELM_ARGS} --tiller-namespace ${APP_ENV} --namespace ${APP_ENV}
	@helm upgrade ${APP_NAME} <InsertHelmRepoName>/${APP_NAME} --install --debug ${HELM_ARGS} --tiller-namespace ${APP_ENV} --namespace ${APP_ENV}

.PHONY: init-helm
init-helm:
	@echo "Initializing Helm"
	@helm init --client-only

.PHONY: clean
clean: 
	@echo "Cleaning up workspace"
	@rm -f ./kubeconfig
