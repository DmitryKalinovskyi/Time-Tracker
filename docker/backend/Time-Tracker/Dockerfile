# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ./../../../backend .
RUN dotnet restore "./Time-Tracker/Time-Tracker.csproj" --disable-parallel
RUN dotnet publish "./Time-Tracker/Time-Tracker.csproj" -c release -o /app --no-restore

# Serve stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

EXPOSE 5015
EXPOSE 7213

ENTRYPOINT ["dotnet", "Time-Tracker.dll"]
