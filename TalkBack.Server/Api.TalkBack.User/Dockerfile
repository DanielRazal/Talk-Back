#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Api.TalkBack.User/Api.TalkBack.User.csproj", "Api.TalkBack.User/"]
RUN dotnet restore "Api.TalkBack.User/Api.TalkBack.User.csproj"
COPY . .
WORKDIR "/src/Api.TalkBack.User"
RUN dotnet build "Api.TalkBack.User.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api.TalkBack.User.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.TalkBack.User.dll"]