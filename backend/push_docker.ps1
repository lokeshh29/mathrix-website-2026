$ErrorActionPreference = "Stop"

$repoName = "mathrix-2026-backend"
$tag = "latest"
$region = "us-east-1"
# Get AWS Account ID dynamically
$accountId = aws sts get-caller-identity --query "Account" --output text
$ecrUri = "$accountId.dkr.ecr.$region.amazonaws.com"
$imageUri = "$ecrUri/$repoName`:$tag"

Write-Host " Starting Docker Build & Push Flow..."
Write-Host "   Account: $accountId"
Write-Host "   Region:  $region"
Write-Host "   Repo:    $repoName"

# 1. Create Repository (if not exists)
Write-Host "`n1️  Checking/Creating ECR Repository..."
try {
    aws ecr describe-repositories --repository-names $repoName --region $region > $null 2>&1
    Write-Host "   Repository '$repoName' already exists."
} catch {
    Write-Host "   Creating repository '$repoName'..."
    try {
        aws ecr create-repository --repository-name $repoName --region $region
    } catch {
        Write-Error "Failed to create ECR repository. Ensure you have 'ecr:CreateRepository' permission."
    }
}

# 2. Login to ECR
Write-Host "`n2️  Logging in to ECR..."
# Using --password-stdin correctly
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $ecrUri

# 3. Build Docker Image
Write-Host "`n3️  Building Docker Image (this may take a while)..."
# Force AMD64 and disable provenance (fixes "media type not supported" error in Lambda)
docker build --platform linux/amd64 --provenance=false -t $repoName .

# 4. Tag Image
Write-Host "`n4️  Tagging Image..."
docker tag "$repoName`:latest" $imageUri

# 5. Push Image
Write-Host "`n5️  Pushing Image to ECR..."
docker push $imageUri

Write-Host "`n Success! Image pushed to:"
Write-Host "   $imageUri"
Write-Host "`nNext Steps:"
Write-Host "1. Create Lambda Function in Console."
Write-Host "2. Choose 'Container image'."
Write-Host "3. Browsereferencing the URI above."
